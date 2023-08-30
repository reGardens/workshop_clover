import { usePage } from "@inertiajs/react";

// get url query string
export const getUrlSearchParameter = (query) => new URLSearchParams(window.location.search).get(query)

// remove some object keys
export const removeObjectKeys = (originalObj, arrayExcludedKeys = []) => {
  return Object.keys(originalObj)
    .filter(key => !arrayExcludedKeys.includes(key)) // exclude the specified keys
    .reduce((obj, key) => {
      obj[key] = originalObj[key];
      return obj;
    }, {});
}

// create url image for show image upload
export const createUrlImage = (e, originUrl = null) => e.target.files[0] ? URL.createObjectURL(e.target.files[0]) : (originUrl || defaultImage);

export const findObject = (arrayObject, key, value) => arrayObject.find((val) => val[key] == value)

export const phoneRegExp = /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

export const defaultImage = '/assets/default/image_default.png'

export const hasAnyPermission = (permissions = null) => {
  const allPermissions = usePage().props.auth.user.can
  let hasPermission = false

  permissions?.forEach(function (item) {
    if (allPermissions[item]) hasPermission = true;
  })
  const roles = usePage().props.auth.user.role
  roles?.forEach(function (item) {
    if (item.name == 'Super Admin') hasPermission = true;
  })
  return hasPermission;
}