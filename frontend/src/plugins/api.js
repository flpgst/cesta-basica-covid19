import axios from "axios";
import config from "./config";

const URL_BASE = config.api_url;

const servidor = axios.create({
  baseURL: URL_BASE,
  timeout: 30000
});

/**
 * Configura os cabeçalhos da requisição ao servidor.
 */
const getHeaders = () => {
  let headers = {};
  if (localStorage.getItem("token")) {
    headers["Authorization"] = "Bearer " + window.localStorage.getItem("token");
  }
  return headers;
};

/**
 * Captura e trata os erros advindos do servidor.
 */
const handleError = error => {
  const message =
    error.response && error.response.data.error
      ? error.response.data.error.message
      : error.message;
  return Promise.reject(message);
};

/**
 * Lista objetos de acordo com os parâmetros de busca.
 *
 * @param {string} recurso
 * @param {Object} params
 */
const listar = (recurso, params = {}) => {
  return servidor
    .get(`${URL_BASE}/${recurso}`, {
      params: formatParams(params),
      headers: getHeaders()
    })
    .then(response => Promise.resolve(response.data))
    .catch(handleError);
};

/**
 * Realiza uma busca de acordo com os parâmetros, retornando o primeiro objeto encontrado
 * Idealmente este método deve ser usado em casos de busca por campos únicos, como cpf ou cnpj.
 *
 * @param {string} recurso
 * @param {object} params
 * @param {string} view
 */
const buscarUm = (recurso, params, view = "DETAILS") => {
  return listar(recurso, { ...params, view }).then(resultado => {
    return Promise.resolve(resultado.length > 0 ? resultado[0] : null);
  });
};

/**
 * Formata os parâmetros de busca para serem passados via query de uma requisição GET.
 *
 * @param {Array} params
 */
function formatParams(params) {
  let formattedParams = {};
  Object.entries(params)
    .filter(value => value !== undefined && value !== null && value !== "")
    .forEach(([key, value]) => {
      let formattedValue;
      if (value instanceof Date) {
        formattedValue = value.toISOString().split("T")[0];
      } else if (typeof value === "boolean") {
        formattedValue = value ? 1 : 0;
      } else {
        formattedValue = value && value.id ? value.id : value;
      }
      formattedParams[key] = formattedValue;
    });
  return formattedParams;
}

/**
 * Carrega um objeto específico por seu id.
 *
 * @param {string} recurso
 * @param {number} id
 */
const carregar = (recurso, id) => {
  const url = recurso.includes(":id")
    ? `${URL_BASE}/${recurso.replace(":id", id)}`
    : `${URL_BASE}/${recurso}/${id}`;
  return servidor
    .get(url, { headers: getHeaders() })
    .then(response => Promise.resolve(response.data))
    .catch(handleError);
};

/**
 * Cria um novo objeto.
 *
 * @param {string} recurso
 * @param {Object} payload
 * @param {function} callback
 */
const criar = (recurso, payload, callback = () => {}) => {
  return servidor
    .post(`${URL_BASE}/${recurso}`, payload, { headers: getHeaders() })
    .then(response => {
      callback(response.data);
      return Promise.resolve(response.data);
    })
    .catch(handleError);
};

/**
 * Atualiza um objeto específico.
 *
 * @param {string} recurso
 * @param {Object} payload
 */
const atualizar = (recurso, payload) => {
  return servidor
    .put(`${URL_BASE}/${recurso}/${payload.id}`, payload, {
      headers: getHeaders()
    })
    .then(response => Promise.resolve(response.data))
    .catch(handleError);
};

/**
 * Exclui um objeto específico.
 *
 * @param {string} recurso
 * @param {number} id
 */
const remover = (recurso, id) => {
  return servidor
    .delete(`${URL_BASE}/${recurso}/${id}`, { headers: getHeaders() })
    .then(() => Promise.resolve())
    .catch(handleError);
};

export default {
  listar,
  buscarUm,
  carregar,
  criar,
  atualizar,
  remover
};

export const TOKENS = "tokens";
