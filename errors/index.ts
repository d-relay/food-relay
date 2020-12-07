export class ForbittenError extends Error {
    public status: number = 403;
    
    constructor(message: string, status?: number) {
        super(message);
        this.status = status;
    }
}