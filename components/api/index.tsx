import axios, { AxiosResponse } from "axios";
import React from "react";

export const BACKEND_URL = "https://rubybackend-xnabw36hha-as.a.run.app";

export function index() {
  return <div>index</div>;
}

export function APIGetArticles(group: string): Promise<AxiosResponse<any>> {
  return axios.get(`${BACKEND_URL}/by_user_group/${group}`, {
    headers: {
      accept: "application/json",
    },
  });
}

export function APIGetAllArticles(): Promise<AxiosResponse<any>> {
  return axios.get(`${BACKEND_URL}/articles`, {
    headers: {
      accept: "application/json",
    },
  });
}

export function APIGetUserInformation(id: string): Promise<AxiosResponse<any>> {
  return axios.get(`${BACKEND_URL}/users/${id}`, {
    headers: {
      accept: "application/json",
    },
  });
}

export type UserProperties = {
  user_type: "string";
  profile: "string";
  first_name: "string";
  second_name: "string";
  age: 0;
  occupation: "string";
  username: "string";
  phone_number: "string";
  gender: "string";
  pregnant: true;
  marital_status: "string";
  pregnancy_week: 0;
  is_anonymous_login: true;
  survey_result: "string";
  email: "string";
  password: "string";
};

export type CreateUserResponse = {
  id: "string";
  user_type: "string";
  profile: "string";
  first_name: "string";
  second_name: "string";
  age: 0;
  occupation: "string";
  username: "string";
  phone_number: "string";
  gender: "string";
  pregnant: true;
  marital_status: "string";
  pregnancy_week: 0;
  is_anonymous_login: true;
  survey_result: "string";
  email: "string";
  password: "string";
};

export function APICreateUser(
  properties: UserProperties
): Promise<AxiosResponse<CreateUserResponse>> {
  return axios.post(`${BACKEND_URL}/users`, properties, {
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
    },
  });
}
