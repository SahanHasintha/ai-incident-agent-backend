import { StateGraph, Annotation, START, END } from '@langchain/langgraph';
import { IncidentState } from './state';
import { parseLogsNode } from '../nodes/parseLogs.node';
import { analyzeSeverityNode } from '../nodes/analyzeSecurity.node';
import { classifyIncidentNode } from '../nodes/classifyIncident.node';
import { rootCauseAnalyseNode } from '../nodes/rootCause.node';
import { recommendedFixesNode } from '../nodes/recommendedFixes.node';

export const IncidentStateAnnotation = Annotation.Root({
    rawLogs: Annotation<string>(),
    severity: Annotation<any>(),
    recommendedFixes: Annotation<any[]>(),
    parsedLogs: Annotation<any[]>(),
    incidentType: Annotation<any>(),
    rootCause: Annotation<string>(),
    confidenceScore: Annotation<string>(),
    incidentReport: Annotation<any>(),
    similarIncidents: Annotation<any>(),
    classificationReasoning: Annotation<string>()
});

const graph = new StateGraph(IncidentStateAnnotation)
  .addNode("parse", parseLogsNode)
  .addNode("severi", analyzeSeverityNode)
  .addNode("classify", classifyIncidentNode)
  .addNode("rootC", rootCauseAnalyseNode)
  .addNode("recomFix", recommendedFixesNode)
  .addEdge(START, "parse")
  .addEdge("parse", "severi")
  .addEdge("severi", "classify")
  .addEdge("classify", "rootC")
  .addEdge("rootC", "recomFix")
  .addEdge("recomFix", END)
  .compile();

export default graph;

