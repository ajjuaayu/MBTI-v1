
import type { MbtiScores, MbtiDichotomy } from "./types";
import type { MBTIType } from "@/config/site";

export function calculateMbtiType(scores: MbtiScores): MBTIType {
  let result = "";
  result += scores.E > scores.I ? "E" : "I";
  result += scores.S > scores.N ? "S" : "N";
  result += scores.T > scores.F ? "T" : "F";
  result += scores.J > scores.P ? "J" : "P";
  return result as MBTIType;
}

export function getDefaultScores(): MbtiScores {
  return { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 };
}

export function getMbtiPercentages(scores: MbtiScores): Record<string, number> {
    const eiTotal = scores.E + scores.I;
    const snTotal = scores.S + scores.N;
    const tfTotal = scores.T + scores.F;
    const jpTotal = scores.J + scores.P;

    return {
        E: eiTotal > 0 ? Math.round((scores.E / eiTotal) * 100) : 50,
        I: eiTotal > 0 ? Math.round((scores.I / eiTotal) * 100) : 50,
        S: snTotal > 0 ? Math.round((scores.S / snTotal) * 100) : 50,
        N: snTotal > 0 ? Math.round((scores.N / snTotal) * 100) : 50,
        T: tfTotal > 0 ? Math.round((scores.T / tfTotal) * 100) : 50,
        F: tfTotal > 0 ? Math.round((scores.F / tfTotal) * 100) : 50,
        J: jpTotal > 0 ? Math.round((scores.J / jpTotal) * 100) : 50,
        P: jpTotal > 0 ? Math.round((scores.P / jpTotal) * 100) : 50,
    };
}
