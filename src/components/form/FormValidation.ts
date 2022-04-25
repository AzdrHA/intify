/**
 * @param {string} value
 * @return {string|null}
 */
export const required = (value: string): string|null => {
  return (value ? null : 'form_error_field_required');
};

/**
 * @param {number} value
 * @return {string|null}
 */
export const mustBeNumber = (value: number): string|null => {
  return (isNaN(value) ? 'Must be a number' : null);
};

export const minValue = (min: number) => {
  return (value: number) => {
    return isNaN(value) || value >= min ? null : `Should be greater than ${min}`;
  };
};

export const composeValidators = (...validators: Function[]) => (value: string) =>
  validators.reduce((error, validator) => error || validator(value), null);
