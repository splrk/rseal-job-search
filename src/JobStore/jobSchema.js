import * as yup from 'yup';

yup.addMethod(yup.object, 'unique', function(inputFields) {
    let fields = inputFields;
    if (!Array.isArray(inputFields)) {
        fields = [inputFields]
    }
    fields = fields.map(field => field.toString());
    
    return this.test('unique', 'Duplicate Job Found', function(value) {
        if (!Array.isArray(this.parent) || !value) {
            return true;
        }

        if (
            this.parent
                .filter(testValue => testValue !== value)
                .some(testValue => fields.reduce((match, field) => (
                    match && (!testValue[field] || testValue[field] === value[field])
                ), true))
        ) {
            throw this.createError({
                path: `${this.path}.${fields[0]}`
            });
        }

        return true;
    });
});

const jobSchema = yup.object().shape({
    id: yup.number(),
    company: yup.string().required(),
    title: yup.string().required(),
    applicationLink: yup.string().url().required(),
    location: yup.string().required().default('Johannesburg, ZA'),
    postedDate: yup.date().notRequired(),
    appliedDate: yup.date().notRequired(),
    response: yup.string().notRequired(),
    responseDate: yup.date().notRequired(),
    linkedin: yup.string().url().notRequired(),
    glassdoor: yup.string().url().notRequired(),
    indeed: yup.string().url().notRequired(),
    notes: yup.string().notRequired(),
    tags: yup.array().of(yup.string()).default([])
})
.unique(['id'])
.unique(['company', 'title'])
.unique(['applicationLink'])
.unique(['linkedin'])
.unique(['glassdoor'])
.unique(['indeed']);

const jobListSchema = yup.array().of(jobSchema);


export {
    jobSchema,
    jobListSchema
};
