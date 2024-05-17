import { parseUnits, formatUnits } from "ethers";

export function delay(delayTimes: any) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(2);
        }, delayTimes);
    });
}

export function toBigNum(value: any, d = 8) {
    return parseUnits(value, d);
}

export function fromBigNum(value: any, d = 8) {
    return parseFloat(formatUnits(value, d));
}

export const styledAddress = (s = "") => {
    if (s && s.length > 10) return s.slice(0, 4) + "..." + s.slice(-4);
    else return s;
};

