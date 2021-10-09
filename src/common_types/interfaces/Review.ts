/** Типы ревью */
export const SELF_ATTESTATION = 'SELF_ATTESTATION';
export const ATTESTATION = 'ATTESTATION';
export const AROUND = 'AROUND';
export const ONE_TO_ONE = 'ONE_TO_ONE';

export type ReviewType = typeof SELF_ATTESTATION
    | typeof ATTESTATION
    | typeof AROUND
    | typeof ONE_TO_ONE;
