import { geminiModel } from '../model/gemini.model';
import { RECOMMENDED_FIX_PROMPT } from '../prompts/recommendedFixes';
import { IncidentState, IncidentType } from './../graph/state';

const recommendedFix = async (rootCause: string, incidentType: IncidentType[]) => {
    const incidentTypeStr = incidentType.join(",");

    const finalPromps = RECOMMENDED_FIX_PROMPT({rootCause: rootCause, incidentType:incidentTypeStr})
    const aiRes = await geminiModel.invoke(finalPromps);
    let content = aiRes.content as string;
    const jsonMatch = content.match(/\{[\s\S]*\}/);

    if (!jsonMatch) {
        throw new Error("No valid JSON found in AI response");
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return parsed;
}

export const recommendedFixesNode = async (state: IncidentState) => {
    if (state && state.rootCause && state.incidentType){
        const res = await recommendedFix(state.rootCause, state.incidentType)
        return {
            ...state,
            recommendedFix: res
        }
    }
    return state;
}