class LocalStorageCache {
    constructor (itemKey, defaultValue, schema = null) {
        this._itemKey = itemKey;
        this._schema = schema;

        const value = window.localStorage.getItem(this._itemKey);
        const jsonValue = value ? JSON.parse(value) : defaultValue;

        this._value = schema && schema.cast ? schema.cast(jsonValue) : jsonValue;
    }

    get value() {
        return this._value;
    }

    updateValue(newValue) {
        window.localStorage.setItem(this._itemKey, JSON.stringify(newValue));
        this._value = newValue
    }
};

export default LocalStorageCache;
