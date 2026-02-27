import { ParsedLogEntry, IncidentType, IncidentState } from '../graph/state';
import { geminiModel } from '../model/gemini.model';
import { ROOT_CAUSE_PROMPT } from '../prompts/rootCause';

type RootCauseInput = {
  parsedLogs: ParsedLogEntry[];
  incidentTypes: IncidentType[];
};

const rootCauseAnalyse = async ({
  parsedLogs,
  incidentTypes
}: RootCauseInput) => {
    try {
        const formattedLogs = parsedLogs
            .map((log, index) => `Level: ${log.level}, Message: ${log.message}, Timestamp: ${log.timestamp}`)
            .join("\n");
        const finalPrompt = ROOT_CAUSE_PROMPT
            .replace("{{LOGS}}", formattedLogs)
            .replace("{{INCIDENT_TYPES}}", incidentTypes.join(", "));
        const aiRes = await geminiModel.invoke(finalPrompt);
        let content = aiRes.content as string;
        const jsonMatch = content.match(/\{[\s\S]*\}/);

        if (!jsonMatch) {
            throw new Error("No valid JSON found in AI response");
        }

        const parsed = JSON.parse(jsonMatch[0]);
        return parsed;
    } catch (error) {
        throw error;
    }
};

export const rootCauseAnalyseNode = async (state: IncidentState) => {
    const {parsedLogs, incidentType} = state;
    const parsedErrorAndWarnLogs = parsedLogs?.filter(l => l.level == 'ERROR' || l.level == 'WARN');
    if (parsedErrorAndWarnLogs && parsedErrorAndWarnLogs.length >= 0 && incidentType && incidentType?.length >= 0){
        const res = await rootCauseAnalyse({parsedLogs: parsedErrorAndWarnLogs, incidentTypes: incidentType});
        return {
            ...state,
            rootCause: res?.rootCause
        }
    }
    return state;
}