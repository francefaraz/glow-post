"use client"

import { useState, useEffect } from "react"
import { Edit2, Trash2, FileText, Loader2 } from "lucide-react"
import { postsApi } from "@/lib/api"
import { toast } from "sonner"

interface Post {
  id: number
  content: string
  topic?: string
  tone?: string
  keywords?: string
  platform?: string
  created_at: string
}

export default function SavedPostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editContent, setEditContent] = useState("")

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    setLoading(true)
    try {
      const response = await postsApi.getAll()
      if (response.error) {
        toast.error(response.error)
      } else if (response.data) {
        setPosts(response.data)
      }
    } catch (error) {
      toast.error("Failed to fetch posts")
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this post?")) return

    try {
      const response = await postsApi.delete(id)
      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success("Post deleted successfully")
        fetchPosts()
      }
    } catch (error) {
      toast.error("Failed to delete post")
    }
  }

  const handleEdit = (post: Post) => {
    setEditingId(post.id)
    setEditContent(post.content)
  }

  const handleSaveEdit = async (id: number) => {
    try {
      const response = await postsApi.update(id, { content: editContent })
      if (response.error) {
        toast.error(response.error)
      } else {
        toast.success("Post updated successfully")
        setEditingId(null)
        fetchPosts()
      }
    } catch (error) {
      toast.error("Failed to update post")
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-[#A855F7]" />
        </div>
      </div>
    )
  }
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
          <FileText className="w-8 h-8 text-[#A855F7]" />
          Saved Posts
        </h1>
        <p className="text-gray-400">Manage your saved content drafts</p>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400">No saved posts yet. Create your first post!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="neon-card flex items-start justify-between gap-4">
              <div className="flex-1">
                {editingId === post.id ? (
                  <div className="space-y-3">
                    <textarea
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="neon-input w-full resize-none"
                      rows={4}
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleSaveEdit(post.id)}
                        className="px-4 py-2 bg-[#A855F7] text-white rounded-lg hover:bg-[#A855F7]/80 transition-colors"
                      >
                        Save
                      </button>
                      <button
                        onClick={() => setEditingId(null)}
                        className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">{post.topic || "Untitled Post"}</h3>
                      {post.tone && (
                        <span className="px-2 py-0.5 text-xs rounded-full bg-[#A855F7]/20 text-[#A855F7] border border-[#A855F7]/30">
                          {post.tone}
                        </span>
                      )}
                    </div>
                    <p className="text-gray-400 text-sm mb-2 whitespace-pre-wrap">{post.content}</p>
                    <p className="text-xs text-gray-500">Saved on {formatDate(post.created_at)}</p>
                  </>
                )}
              </div>
              {editingId !== post.id && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(post)}
                    className="p-2 rounded-lg hover:bg-[#3B82F6]/20 transition-colors group"
                  >
                    <Edit2 className="w-5 h-5 text-gray-400 group-hover:text-[#3B82F6]" />
                  </button>
                  <button
                    onClick={() => handleDelete(post.id)}
                    className="p-2 rounded-lg hover:bg-red-500/20 transition-colors group"
                  >
                    <Trash2 className="w-5 h-5 text-gray-400 group-hover:text-red-500" />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
