import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { Dialog, DialogContent } from '../../components/ui/dialog';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '../../components/ui/table';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '../../components/ui/select';
import { api } from '../../lib/api';
import { toast } from 'sonner';

const emptyForm = {
  slug: '',
  title: '',
  metaDescription: '',
  keywordsText: '',
  category: '',
  coverImage: '',
  coverImageAlt: '',
  publishedDate: new Date().toISOString().slice(0, 10),
  readTime: '',
  excerpt: '',
  content: [],
};

const slugify = (text) =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

const emptyBlock = (type) => {
  if (type === 'list') return { type, items: [''] };
  if (type === 'image') return { type, src: '', alt: '', caption: '' };
  return { type, text: '' };
};

const AdminBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    api
      .get('/blogs')
      .then((res) => setBlogs(res.data))
      .catch(() => toast.error('Failed to load blogs'))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  };

  const openEdit = (blog) => {
    setEditingId(blog.id);
    setForm({
      slug: blog.slug,
      title: blog.title,
      metaDescription: blog.metaDescription,
      keywordsText: (blog.keywords || []).join(', '),
      category: blog.category,
      coverImage: blog.coverImage,
      coverImageAlt: blog.coverImageAlt,
      publishedDate: blog.publishedDate,
      readTime: blog.readTime,
      excerpt: blog.excerpt,
      content: blog.content || [],
    });
    setIsDialogOpen(true);
  };

  const addBlock = (type) => {
    setForm({ ...form, content: [...form.content, emptyBlock(type)] });
  };

  const updateBlock = (index, updated) => {
    const next = [...form.content];
    next[index] = updated;
    setForm({ ...form, content: next });
  };

  const removeBlock = (index) => {
    setForm({ ...form, content: form.content.filter((_, i) => i !== index) });
  };

  const moveBlock = (index, direction) => {
    const target = index + direction;
    if (target < 0 || target >= form.content.length) return;
    const next = [...form.content];
    [next[index], next[target]] = [next[target], next[index]];
    setForm({ ...form, content: next });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      slug: form.slug || slugify(form.title),
      title: form.title,
      metaDescription: form.metaDescription,
      keywords: form.keywordsText
        .split(',')
        .map((k) => k.trim())
        .filter(Boolean),
      category: form.category,
      coverImage: form.coverImage,
      coverImageAlt: form.coverImageAlt,
      publishedDate: form.publishedDate,
      readTime: form.readTime,
      excerpt: form.excerpt,
      content: form.content,
    };

    try {
      if (editingId) {
        await api.put(`/blogs/${editingId}`, payload);
        toast.success('Blog updated');
      } else {
        await api.post('/blogs', payload);
        toast.success('Blog created');
      }
      setIsDialogOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save blog');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this blog?')) return;
    try {
      await api.delete(`/blogs/${id}`);
      toast.success('Blog deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete blog');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Blog</h1>
        <Button onClick={openCreate} className="bg-blue-900 hover:bg-blue-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Blog
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Published</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogs.map((blog) => (
                <TableRow key={blog.id}>
                  <TableCell className="font-medium max-w-sm">{blog.title}</TableCell>
                  <TableCell>{blog.category}</TableCell>
                  <TableCell>{blog.publishedDate}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(blog)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(blog.id)}>
                      <Trash2 className="w-4 h-4 text-red-600" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-bold text-blue-900 mb-4">
            {editingId ? 'Edit Blog' : 'Add Blog'}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                value={form.title}
                onChange={(e) =>
                  setForm({
                    ...form,
                    title: e.target.value,
                    slug: editingId ? form.slug : slugify(e.target.value),
                  })
                }
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Slug</Label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: slugify(e.target.value) })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Input
                  value={form.category}
                  onChange={(e) => setForm({ ...form, category: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Meta Description (SEO)</Label>
              <Textarea
                value={form.metaDescription}
                onChange={(e) => setForm({ ...form, metaDescription: e.target.value })}
                rows={2}
                required
              />
            </div>
            <div className="space-y-2">
              <Label>Keywords (comma separated)</Label>
              <Input
                value={form.keywordsText}
                onChange={(e) => setForm({ ...form, keywordsText: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Cover Image URL</Label>
                <Input
                  value={form.coverImage}
                  onChange={(e) => setForm({ ...form, coverImage: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Cover Image Alt Text</Label>
                <Input
                  value={form.coverImageAlt}
                  onChange={(e) => setForm({ ...form, coverImageAlt: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Published Date</Label>
                <Input
                  type="date"
                  value={form.publishedDate}
                  onChange={(e) => setForm({ ...form, publishedDate: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Read Time</Label>
                <Input
                  value={form.readTime}
                  onChange={(e) => setForm({ ...form, readTime: e.target.value })}
                  placeholder="6 min read"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Excerpt (shown on blog listing card)</Label>
              <Textarea
                value={form.excerpt}
                onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
                rows={2}
                required
              />
            </div>

            {/* Content blocks editor */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Article Content</Label>
                <Select onValueChange={(type) => addBlock(type)}>
                  <SelectTrigger className="w-44 h-8 text-xs">
                    <SelectValue placeholder="+ Add Block" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="heading">Heading</SelectItem>
                    <SelectItem value="paragraph">Paragraph</SelectItem>
                    <SelectItem value="list">Bulleted List</SelectItem>
                    <SelectItem value="image">Image</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                {form.content.map((block, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-gray-50 relative space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-semibold uppercase text-blue-900">
                        {block.type}
                      </span>
                      <div className="flex gap-1">
                        <button
                          type="button"
                          onClick={() => moveBlock(index, -1)}
                          className="text-gray-400 hover:text-blue-900"
                        >
                          <ArrowUp className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => moveBlock(index, 1)}
                          className="text-gray-400 hover:text-blue-900"
                        >
                          <ArrowDown className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => removeBlock(index)}
                          className="text-gray-400 hover:text-red-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {(block.type === 'heading' || block.type === 'paragraph') && (
                      <Textarea
                        value={block.text}
                        onChange={(e) => updateBlock(index, { ...block, text: e.target.value })}
                        rows={block.type === 'heading' ? 1 : 3}
                        placeholder={block.type === 'heading' ? 'Heading text' : 'Paragraph text'}
                      />
                    )}

                    {block.type === 'list' && (
                      <Textarea
                        value={block.items.join('\n')}
                        onChange={(e) =>
                          updateBlock(index, {
                            ...block,
                            items: e.target.value.split('\n'),
                          })
                        }
                        rows={4}
                        placeholder="One list item per line"
                      />
                    )}

                    {block.type === 'image' && (
                      <div className="space-y-2">
                        <Input
                          value={block.src}
                          onChange={(e) => updateBlock(index, { ...block, src: e.target.value })}
                          placeholder="Image URL"
                        />
                        <Input
                          value={block.alt}
                          onChange={(e) => updateBlock(index, { ...block, alt: e.target.value })}
                          placeholder="Alt text"
                        />
                        <Input
                          value={block.caption}
                          onChange={(e) =>
                            updateBlock(index, { ...block, caption: e.target.value })
                          }
                          placeholder="Caption (optional)"
                        />
                      </div>
                    )}
                  </div>
                ))}
                {form.content.length === 0 && (
                  <p className="text-sm text-gray-400">
                    No content blocks yet - use "+ Add Block" above.
                  </p>
                )}
              </div>
            </div>

            <Button type="submit" className="w-full bg-blue-900 hover:bg-blue-800">
              Save
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBlogs;
