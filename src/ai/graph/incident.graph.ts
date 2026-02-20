import { StateGraph, Annotation, START, END } from '@langchain/langgraph';
import { IncidentState } from './state';
import { parseLogsNode } from '../nodes/parseLogs.node';

export const IncidentStateAnnotation = Annotation.Root({
    rawLogs: Annotation<String>(),
    severity: Annotation<any>(),
    recommendedFixes: Annotation<any[]>(),
    parsedLogs: Annotation<any[]>(),
    incidentType: Annotation<any>(),
    rootCause: Annotation<String>(),
    confidenceScore: Annotation<String>(),
    incidentReport: Annotation<any>(),
    similarIncidents: Annotation<any>()
});

const graph = new StateGraph(IncidentStateAnnotation)
  .addNode("parse", parseLogsNode)
  .addEdge(START, "parse")
  .addEdge("parse", END)
  .compile();

export default graph;

