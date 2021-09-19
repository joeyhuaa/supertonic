import { useState, useEffect, useRef, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from 'react-query'
import axios from 'axios'
import { useStore } from "../store";

export function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null); // mutable ref to store current callback

  const setStateCallback = useCallback((state, cb) => {
    cbRef.current = cb; // store passed callback to ref
    setState(state);
  }, []);

  useEffect(() => {
    // cb.current is `null` on initial render, so we only execute cb on state *updates*
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset callback after execution
    }
  }, [state]);

  return [state, setStateCallback];
}

export function useTheme() {
  return useQuery(
    ['theme'],
    async () => {
      let res = await fetch('/api/user/theme')
      let { theme } = res.json()
      return theme
    }
  )
}

export function useChangeTheme() {
  const { setTheme } = useStore.getState()

  return useMutation(
    theme => axios.put(`/api/user/change_theme`, theme).then(res => res.data),
    {
      onSuccess: ({ theme }) => {
        setTheme(theme) // update state
      }
    }
  )
}