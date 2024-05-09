export const emailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function hasBasicEmailStructure(email: string): boolean {
    return (
        email.includes('@') && email.split('@')[1].length > 0 && email.split('@')[1].includes('.')
    );
}

export function validateEmail(email: string): boolean {
    return hasBasicEmailStructure(email) && emailRegex.test(email);
}
