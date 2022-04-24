export const objectToFormData = (obj: any, form: FormData | null = null) => {
  const fd = form || new FormData();
  let formKey;
  for (const property in obj) {
    if (obj.hasOwnProperty(property)) {
      formKey = property;

      if (
        typeof obj[property] === 'object' &&
        !(obj[property] instanceof Blob)
      ) {
        objectToFormData(obj[property], fd);
      } else {
        fd.append(formKey, obj[property]);
      }
    }
  }

  return fd;
};
