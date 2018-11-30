module.exports = {
  abortEarly: false,
  language: {
    root: 'valor',
    key: 'El campo de {{!label}} ',
    messages: {
        wrapArrays: true
    },
    any: {
        unknown: 'no se permite',
        invalid: 'contains an invalid value',
        empty: 'se encuentra vacío',
        required: 'es requerido',
        allowOnly: 'debe ser alguna de estas opciones {{valids}}',
        default: 'threw an error when running default method'
    },
    alternatives: {
        base: 'not matching any of the allowed alternatives',
        child: null
    },
    array: {
        base: 'debe ser un arreglo',
        includes: 'at position {{pos}} does not match any of the allowed types',
        includesSingle: 'single value of "{{!label}}" does not match any of the allowed types',
        includesOne: 'at position {{pos}} fails because {{reason}}',
        includesOneSingle: 'single value of "{{!label}}" fails because {{reason}}',
        includesRequiredUnknowns: 'does not contain {{unknownMisses}} required value(s)',
        includesRequiredKnowns: 'does not contain {{knownMisses}}',
        includesRequiredBoth: 'does not contain {{knownMisses}} and {{unknownMisses}} other required value(s)',
        excludes: 'at position {{pos}} contains an excluded value',
        excludesSingle: 'single value of "{{!label}}" contains an excluded value',
        min: 'must contain at least {{limit}} items',
        max: 'must contain less than or equal to {{limit}} items',
        length: 'must contain {{limit}} items',
        ordered: 'at position {{pos}} fails because {{reason}}',
        orderedLength: 'at position {{pos}} fails because array must contain at most {{limit}} items',
        ref: 'references "{{ref}}" which is not a positive integer',
        sparse: 'must not be a sparse array',
        unique: 'position {{pos}} contains a duplicate value'
    },
    boolean: {
        base: 'debe ser un valor boleano (verdadero/falso)'
    },
    binary: {
        base: 'must be a buffer or a string',
        min: 'must be at least {{limit}} bytes',
        max: 'debe ser menor o igual que {{limit}} bytes',
        length: 'must be {{limit}} bytes'
    },
    date: {
        base: 'debe ser un número de milisegundos o cadena de fecha válida',
        format: 'must be a string with one of the following formats {{format}}',
        strict: 'must be a valid date',
        min: 'debe ser mayor o igual que "{{limit}}"',
        max: 'debe ser menor o igual que "{{limit}}"',
        isoDate: 'must be a valid ISO 8601 date',
        timestamp: {
            javascript: 'must be a valid timestamp or number of milliseconds',
            unix: 'must be a valid timestamp or number of seconds'
        },
        ref: 'references "{{ref}}" which is not a date'
    },
    function: {
        base: 'must be a Function',
        arity: 'must have an arity of {{n}}',
        minArity: 'must have an arity greater or equal to {{n}}',
        maxArity: 'must have an arity lesser or equal to {{n}}',
        ref: 'must be a Joi reference',
        class: 'must be a class'
    },
    lazy: {
        base: '!!schema error: lazy schema must be set',
        schema: '!!schema error: lazy schema function must return a schema'
    },
    object: {
        base: 'debe ser un objeto',
        child: '!!child "{{!child}}" fails because {{reason}}',
        min: 'must have at least {{limit}} children',
        max: 'must have less than or equal to {{limit}} children',
        length: 'must have {{limit}} children',
        allowUnknown: '!!{{!child}} no se permite',
        with: '!!"{{mainWithLabel}}" missing required peer "{{peerWithLabel}}"',
        without: '!!"{{mainWithLabel}}" conflict with forbidden peer "{{peerWithLabel}}"',
        missing: 'must contain at least one of {{peersWithLabels}}',
        xor: 'contains a conflict between exclusive peers {{peersWithLabels}}',
        or: 'must contain at least one of {{peersWithLabels}}',
        and: 'contains {{presentWithLabels}} without its required peers {{missingWithLabels}}',
        nand: '!!"{{mainWithLabel}}" must not exist simultaneously with {{peersWithLabels}}',
        assert: '!!"{{ref}}" validation failed because "{{ref}}" failed to {{message}}',
        rename: {
            multiple: 'cannot rename child "{{from}}" because multiple renames are disabled and another key was already renamed to "{{to}}"',
            override: 'cannot rename child "{{from}}" because override is disabled and target "{{to}}" exists',
            regex: {
                multiple: 'cannot rename children {{from}} because multiple renames are disabled and another key was already renamed to "{{to}}"',
                override: 'cannot rename children {{from}} because override is disabled and target "{{to}}" exists'
            }
        },
        type: 'must be an instance of "{{type}}"',
        schema: 'must be a Joi instance'
    },
    number: {
        base: 'debe ser un numero',
        min: 'debe ser mayor o igual que {{limit}}',
        max: 'debe ser menor o igual que {{limit}}',
        less: 'must be less than {{limit}}',
        greater: 'must be greater than {{limit}}',
        float: 'must be a float or double',
        integer: 'debe ser un entero',
        negative: 'must be a negative number',
        positive: 'debe ser un numero positivo',
        precision: 'must have no more than {{limit}} decimal places',
        ref: 'references "{{ref}}" which is not a number',
        multiple: 'must be a multiple of {{multiple}}'
    },
    string: {
        base: 'debe ser una cadena de texto',
        min: 'la longitud debe ser de al menos {{limit}} caracteres',
        max: 'la longitud debe ser menor o igual a {{limit}} caracteres',
        length: 'la longitud debe ser de {{limit}} caracteres',
        alphanum: 'must only contain alpha-numeric characters',
        token: 'must only contain alpha-numeric and underscore characters',
        regex: {
            base: 'con el valor "{{!value}}" no coincide con el patrón requerido',
            name: 'con el valor "{{!value}}" no coincide con el patrón requerido',
            invert: {
                base: 'with value "{{!value}}" matches the inverted pattern: {{pattern}}',
                name: 'with value "{{!value}}" matches the inverted {{name}} pattern'
            }
        },
        email: 'debe ser un correo electrónico válido.',
        uri: 'must be a valid uri',
        uriRelativeOnly: 'must be a valid relative uri',
        uriCustomScheme: 'must be a valid uri with a scheme matching the {{scheme}} pattern',
        isoDate: 'must be a valid ISO 8601 date',
        guid: 'debe ser un identificador único uuidv4',
        hex: 'must only contain hexadecimal characters',
        base64: 'must be a valid base64 string',
        hostname: 'must be a valid hostname',
        normalize: 'must be unicode normalized in the {{form}} form',
        lowercase: 'solo debe contener caracteres en minúsculas',
        uppercase: 'must only contain uppercase characters',
        trim: 'no debe tener espacios en blanco iniciales o finales',
        creditCard: 'debe ser el número de una tarjeta de crédito',
        ref: 'references "{{ref}}" which is not a number',
        ip: 'must be a valid ip address with a {{cidr}} CIDR',
        ipVersion: 'must be a valid ip address of one of the following versions {{version}} with a {{cidr}} CIDR'
    }
  }
}
