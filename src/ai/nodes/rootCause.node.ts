import { ParsedLogEntry, IncidentType, IncidentState } from '../graph/state';

type RootCauseInput = {
  parsedLogs: ParsedLogEntry[];
  incidentTypes: IncidentType[];
};

const rootCauseAnalyse = async ({
  parsedLogs,
  incidentTypes
}: RootCauseInput) => {
  console.log(parsedLogs);
  console.log(incidentTypes)
};

export const rootCauseAnalyseNode = async (state: IncidentState) => {
    const {parsedLogs, incidentType} = state;
    const parsedErrorAndWarnLogs = parsedLogs?.filter(l => l.level == 'ERROR' || l.level == 'WARN')
    if (parsedErrorAndWarnLogs && parsedErrorAndWarnLogs.length >= 0 && incidentType && incidentType?.length >= 0){
        const res = await rootCauseAnalyse({parsedLogs: parsedErrorAndWarnLogs, incidentTypes: incidentType});
    }
    return state;
}