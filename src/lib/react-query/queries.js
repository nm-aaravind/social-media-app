import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { createAccount, signIn, signOut, createPost, getRecentPosts } from '../appwrite/apis'

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
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (post) => createPost(post),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
        }
    })
}
export const useGetRecentPosts = () => {
    return useQuery({
        queryKey: ['getRecentPosts'],
        queryFn: getRecentPosts
    })
}