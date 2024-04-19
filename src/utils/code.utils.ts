import _ from "lodash";

export const testSolution = (code: string, solution: string): boolean => {
  const normalizeString = (str: string): string => {
    return _.replace(str, /\s+/g, "");
  };

  const normalizedCode = normalizeString(code);
  const normalizedSolution = normalizeString(solution);

  return normalizedCode === normalizedSolution;
};
