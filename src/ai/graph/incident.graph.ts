import { StateGraph, Annotation, START, END } from '@langchain/langgraph';
import { IncidentState } from './state';
import { parseLogsNode } from '../nodes/parseLogs.node';
import { analyzeSeverityNode } from '../nodes/analyzeSecurity.node';

export const IncidentStateAnnotation = Annotation.Root({
    rawLogs: Annotation<string>(),
    severity: Annotation<any>(),
    recommendedFixes: Annotation<any[]>(),
    parsedLogs: Annotation<any[]>(),
    incidentType: Annotation<any>(),
    rootCause: Annotation<string>(),
    confidenceScore: Annotation<string>(),
    incidentReport: Annotation<any>(),
    similarIncidents: Annotation<any>()
});

const graph = new StateGraph(IncidentStateAnnotation)
  .addNode("parse", parseLogsNode)
  .addNode("severi", analyzeSeverityNode)
  .addEdge(START, "parse")
  .addEdge("parse", "severi")
  .addEdge("severi", END)
  .compile();

export default graph;

