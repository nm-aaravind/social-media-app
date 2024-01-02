import { useQuery, useMutation, useQueryClient, useInfiniteQuery } from '@tanstack/react-query'
import { createAccount, signIn, signOut, getPostById ,createPost, getRecentPosts, likePost, savePost, removeSavedPost, getUser, getSaves, updatePost, deletePost, getInfinitePosts, searchPosts, updateProfile, createComment, deleteComment, addFollower, getUserById, removeFollower } from '../appwrite/apis'

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

export const useCreateComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ postId, userId, content  }) => createComment(postId, userId, content),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
        }
    })
}

export const useDeleteComment = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ commentId  }) => deleteComment(commentId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getRecentPosts']
            })
        }
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
            queryClient.invalidateQueries({
                queryKey: ['getInfinitePosts']
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
export const useGetUserById = ({ accountid }) => {
    return useQuery({
        queryKey: ['getUserById', accountid],
        queryFn: () =>getUserById(accountid),
        enabled: true
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
            queryClient.invalidateQueries({
                queryKey: ['getInfinitePosts']
            })
        }
    })
}
export const useAddFollower = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({toFollowId, followingId}) => addFollower(followingId, toFollowId),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getUserById']
            })
            queryClient.invalidateQueries({
                queryKey: ['getUser']
            })
        }
    })
}
export const useRemoveFollower = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => removeFollower(id),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getUser']
            })
            queryClient.invalidateQueries({
                queryKey: ['getUserById']
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
            queryClient.invalidateQueries({
                queryKey: ['getInfinitePosts']
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
        queryKey: ['searchPosts', searchWord],
        queryFn : () => searchPosts(searchWord),
        enabled: !!searchWord
    })
}

export const useUpdateProfile = () => {
    const queryClient = useQueryClient()
    return useMutation({
        mutationFn: ({ userId, name, username, bio, file, image, currImage }) => updateProfile(userId, name, username, bio, file, image, currImage),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['getUser']
            })
        }
    })
}