import { IncidentState, ParsedLogEntry } from "../graph/state";

const analyzeSeverity = (parsedLogs: ParsedLogEntry[]) => {
    const hasError = parsedLogs.some(log => log.level === "ERROR");
    const hasWarn = parsedLogs.some(log => log.level === "WARN");

    let severity = "low";

    if (hasError) severity = "high";
    else if (hasWarn) severity = "medium";

    return severity;
}

export const analyzeSeverityNode = (state: IncidentState) => {
    if (state.parsedLogs){

        const severityVal = analyzeSeverity(state.parsedLogs);
        return {
            ...state,
            severity: severityVal
        }
    }

    return state;
}