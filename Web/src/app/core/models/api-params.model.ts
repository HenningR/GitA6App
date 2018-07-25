export interface ApiParams {
    successMessage?: string;
    failMessage?: string;
    success?: (r)=>any;
    failure?: (r)=>any;
    inBody?: boolean;
}