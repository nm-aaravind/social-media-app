import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { createAccount, signIn, signOut, getPostById ,createPost, getRecentPosts, likePost, savePost, removeSavedPost, getUser, getSaves, updatePost, deletePost, getInfinitePosts, searchPosts } from '../appwrite/apis'

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
export const useLikePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ likeArray, postId }) => likePost(likeArray, postId),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['getPostById', data?.$id]
            })
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
            queryClient.invalidateQueries({
                queryKey: ['getPosts']
            })
            queryClient.invalidateQueries({
                queryKey: ['getUserProfile']
            })
        }
    })
}
export const useGetUser = () => {
    return useQuery({
        queryKey: ['getUser'],
        queryFn: getUser
    })
}
export const useSavePost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({postId, userId}) => savePost(postId, userId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getUser']
            })
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
            queryClient.invalidateQueries({
                queryKey: ['getPosts']
            })
        }
    })
}
export const useRemoveSavedPost = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (savedPostId) => removeSavedPost(savedPostId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getUser']
            })
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
            queryClient.invalidateQueries({
                queryKey: ['getPosts']
            })
        }
    })
}
export const useGetSaves = (userId) => {
    return useQuery({
        queryKey: ['getSaves', userId],
        queryFn: () => getSaves(userId),
        enabled: true
    })
}
export const useGetPostById = (id) => {
    return useQuery({
        queryKey: ['getPostById', id],
        queryFn: () => getPostById(id)
    })
}
export const useUpdatePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: (post) => updatePost(post),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
            queryClient.invalidateQueries({
                queryKey: ['getPostById', data?.$id]
            })
        }
    })
}
export const useDeletePost = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ postId, imageId }) => deletePost(postId, imageId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
        }
    })
}

export const useGetPosts = () => {
    return useInfiniteQuery({
        queryKey: ['getInfinitePosts'],
        queryFn: getInfinitePosts,
        getNextPageParam: (lastPage) => {
            if(lastPage && lastPage.documents.length ===0 ) return null
            const lastId = lastPage.documents[lastPage?.documents.length - 1].$id
            return lastId
        }
    })
}

export const useSearchPosts = (searchWord) => {
    return useQuery({
        queryKey: ['searchPosts'],
        queryFn : (searchWord) => searchPosts(searchWord),
        enabled: !!searchWord
    })
}