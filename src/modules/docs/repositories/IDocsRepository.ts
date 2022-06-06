interface IDocsRepository {
    convertLdToCodeBar(ld: string): string;
    convertLdToAmount(ld: string): string;
    convertLdToDate(ld: string): string;
    verifyDv(ld: string): boolean;
}

export { IDocsRepository };
