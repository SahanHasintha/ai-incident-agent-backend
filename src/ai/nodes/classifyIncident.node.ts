import { IncidentState, ParsedLogEntry } from "../graph/state";
import { geminiModel } from "../model/classifyIncident.model";
import { INCIDENT_CLASSIFICATION_PROMPT } from '../prompts/incidentClassification'

const classifyIncident = async (parsedLogs : ParsedLogEntry[]) => {
    if (!parsedLogs || parsedLogs.length <= 0) {
        return {
            incidentType: 'UNKNOWN',
            confidenceScore: 0
        }
    }
    const relevantLogs = parsedLogs.filter(l => l.level == 'ERROR' || l.level == 'WARN');
    if (relevantLogs.length === 0) {
        return {
        incidentTypes: ["UNKNOWN"],
        primaryIncidentType: "UNKNOWN",
        confidenceScore: 0.2
        };
    }

    const formattedLogs = relevantLogs
        .map(log => `[${log.level}][${log.service}] ${log.message}`)
        .join("\n");

    const finalPrompt = INCIDENT_CLASSIFICATION_PROMPT.replace(
        "{{INSERT_RELEVANT_LOGS_HERE}}",
        formattedLogs
    );

    const aiRes = await geminiModel.invoke(finalPrompt);
    let content = aiRes.content as string;

    // Extract JSON block safely
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
    throw new Error("No valid JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed;
}

export const classifyIncidentNode = async (state: IncidentState) => {
    console.log('xxxxxxxx')
    if (state.parsedLogs){
        const res = await classifyIncident(state.parsedLogs);
        return {
            ...state,
            incidentState: res?.incidentTypes,
            confidenceScore: res?.confidenceScore,
            classificationReasoning: res?.reasoning
        }
    }
    return state;
}