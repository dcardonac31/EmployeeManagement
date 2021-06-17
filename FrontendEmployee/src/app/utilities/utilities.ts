export function toBase64(file: File){
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
}

export function parseApiErrors(response: any): string[]{
    console.log(response);
    const result: string[] = [];

    if(response.error){
        if(typeof response.error === 'string'){
            result.push(response.error);   
        } else if (Array.isArray(response.error)){
            response.error.forEach(value => result.push(value.description))
        }
        else{
            const errorsMap = response.error.errors;
            const entries = Object.entries(errorsMap);
            entries.forEach((array: any[]) =>{
                const field = array[0];
                array[1].forEach(errorMessage => {
                    result.push(`${field}: ${errorMessage}`)
                });
            })
        }
    }

    return result
}