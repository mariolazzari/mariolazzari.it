import { Result } from "@/types";
import { getError, throwError } from "./errors";
import { revalidatePath } from "next/cache";

const BASE_URL = process.env.INTERNAL_API_URL ?? "http://127.0.0.1:8080/api";

const getHeaders = (token?: string): HeadersInit => {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
};

export async function getData<TData>(
  url: string,
  token?: string,
): Promise<Result<TData>> {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "GET",
      headers: getHeaders(token),
    });

    if (!res.ok) {
      const msg = await res.text();
      throw new Error(msg);
    }
    const data: TData = await res.json();

    return {
      success: true,
      data,
    };
  } catch (ex: unknown) {
    console.error(ex);

    return {
      success: false,
      error: getError(ex),
    };
  }
}

export async function postData<TBody, TData>(
  url: string,
  body: TBody,
  token?: string,
): Promise<Result<TData>> {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: getHeaders(token),
    });
    if (!res.ok) {
      await throwError(res);
    }

    const data: TData = await res.json();

    return {
      success: true,
      data,
    };
  } catch (ex: unknown) {
    return {
      success: false,
      error: getError(ex),
    };
  }
}

export async function putData<TBody, TData>(
  url: string,
  body: TBody,
  token?: string,
): Promise<Result<TData>> {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: getHeaders(token),
    });
    if (!res.ok) {
      await throwError(res);
    }

    const data: TData = await res.json();

    return {
      success: true,
      data,
    };
  } catch (ex: unknown) {
    return {
      success: false,
      error: getError(ex),
    };
  }
}

export async function delData(url: string, token?: string): Promise<boolean> {
  try {
    const res = await fetch(`${BASE_URL}${url}`, {
      method: "DELETE",
      headers: getHeaders(token),
    });

    if (!res.ok) {
      await throwError(res);
    }

    return true;
  } catch (ex: unknown) {
    console.error("Error deleting entity:", ex);
    return false;
  }
}

type GetPagination = (limit: string, offset: string) => [number, number];

export const getPagination: GetPagination = (limit, offset) => {
  // check limit
  let l = +limit;
  // no limit found: 10
  if (isNaN(l) || l <= 0) {
    l = 10;
  }
  // max limit 100
  if (l > 100) {
    l = 100;
  }

  // check offset
  let o = +offset;
  // no offset found:0
  if (isNaN(o) || o < 0) {
    o = 0;
  }

  return [l, o];
};

export const revalidate = (ok: boolean, path: string) => {
  if (ok) {
    revalidatePath(path);
  }
};
