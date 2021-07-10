export class Field {
    name: string;
    label: string;
    value: string;
    touched: boolean;
    invalid: boolean;
    error: string;

    constructor(name: string, label: string) {
        this.name = name;
        this.label = label;
        this.value = '';
        this.touched = false;
        this.invalid = false;
        this.error = '';
    }

    static setValue(field: Field, value = ''): Field {
        field.value = value;
        field.touched = true;
        return field;
    }

    static setError(field: Field, error = ''): Field {
        if (error === null || error.trim().length === 0) {
            field.invalid = false;
            field.error = ''
        } else {
            field.invalid = true;
            field.error = error;
        }
        return field;
    }

    static setDefault(field: Field): Field {
        field.value = '';
        field.touched = false;
        field.invalid = false;
        field.error = '';
        return field;
    }

    static hasValue(field: Field): Field {
        Field.setError(field);

        if (field.value.trim().length === 0) {
            return Field.setError(field, `${field.label} is required.`)
        }
        return field;
    }
}