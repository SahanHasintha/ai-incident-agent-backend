export const RECOMMENDED_FIX_PROMPT = ({
  rootCause,
  incidentType
}: {
  rootCause: string;
  incidentType: string;
}) => `
You are a senior SRE.

Root Cause:
${rootCause}

Incident Type:
${incidentType}

Provide actionable recommended fixes.

Return JSON only:
{
  "recommendedFixes": [
    {
      "title": "string",
      "description": "string",
      "priority": "low | medium | high"
    }
  ]
}
`;