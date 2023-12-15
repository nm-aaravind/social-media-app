import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { createAccount, signIn, signOut, createPost } from '../appwrite/apis'

export const useCreateUser = () => {
    return useMutation({
        mutationFn: (user) => createAccount(user),
    })
}
export const useSignIn = () => {
    return useMutation({
        mutationFn: (user) => signIn(user),
    })
}
export const useSignOut = () => {
    return useMutation({
        mutationFn: signOut
    })
}
export const useCreatePost = () => {
    return useMutation({
        mutationFn: createPost
    })
}