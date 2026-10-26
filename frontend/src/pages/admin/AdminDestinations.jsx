import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Plus, Pencil, Trash2, X } from 'lucide-react';
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
import { api } from '../../lib/api';
import { toast } from 'sonner';

const emptyForm = {
  name: '',
  image: '',
  description: '',
  price: '',
  duration: '',
  highlightsText: '',
  includesText: '',
  itinerary: [],
  display_order: 0,
};

const linesToArray = (text) =>
  text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

const AdminDestinations = ({ endpoint, title }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const load = () => {
    setLoading(true);
    api
      .get(`/${endpoint}`)
      .then((res) => setItems(res.data))
      .catch(() => toast.error(`Failed to load ${title}`))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endpoint]);

  const openCreate = () => {
    setEditingId(null);
    setForm(emptyForm);
    setIsDialogOpen(true);
  };

  const openEdit = (item) => {
    setEditingId(item.id);
    setForm({
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
      duration: item.duration,
      highlightsText: (item.highlights || []).join('\n'),
      includesText: (item.includes || []).join('\n'),
      itinerary: item.itinerary || [],
      display_order: item.display_order,
    });
    setIsDialogOpen(true);
  };

  const addItineraryDay = () => {
    setForm({
      ...form,
      itinerary: [...form.itinerary, { day: form.itinerary.length + 1, title: '', activities: '' }],
    });
  };

  const updateItineraryDay = (index, field, value) => {
    const next = [...form.itinerary];
    next[index] = { ...next[index], [field]: field === 'day' ? Number(value) : value };
    setForm({ ...form, itinerary: next });
  };

  const removeItineraryDay = (index) => {
    setForm({ ...form, itinerary: form.itinerary.filter((_, i) => i !== index) });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      image: form.image,
      description: form.description,
      price: form.price,
      duration: form.duration,
      highlights: linesToArray(form.highlightsText),
      includes: linesToArray(form.includesText),
      itinerary: form.itinerary,
      display_order: Number(form.display_order) || 0,
    };

    try {
      if (editingId) {
        await api.put(`/${endpoint}/${editingId}`, payload);
        toast.success(`${title} updated`);
      } else {
        await api.post(`/${endpoint}`, payload);
        toast.success(`${title} created`);
      }
      setIsDialogOpen(false);
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || `Failed to save ${title}`);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm(`Delete this destination?`)) return;
    try {
      await api.delete(`/${endpoint}/${id}`);
      toast.success('Deleted');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to delete');
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-blue-900">{title}</h1>
        <Button onClick={openCreate} className="bg-blue-900 hover:bg-blue-800">
          <Plus className="w-4 h-4 mr-2" />
          Add Destination
        </Button>
      </div>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Order</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.price}</TableCell>
                  <TableCell>{item.duration}</TableCell>
                  <TableCell>{item.display_order}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" onClick={() => openEdit(item)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)}>
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
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <h2 className="text-lg font-bold text-blue-900 mb-4">
            {editingId ? `Edit Destination` : `Add Destination`}
          </h2>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Name</Label>
                <Input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Image URL</Label>
                <Input
                  value={form.image}
                  onChange={(e) => setForm({ ...form, image: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Short Description</Label>
              <Input
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                required
              />
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Price (e.g. From ₹12,999)</Label>
                <Input
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Duration</Label>
                <Input
                  value={form.duration}
                  onChange={(e) => setForm({ ...form, duration: e.target.value })}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label>Display Order</Label>
                <Input
                  type="number"
                  value={form.display_order}
                  onChange={(e) => setForm({ ...form, display_order: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Highlights (one per line)</Label>
              <Textarea
                value={form.highlightsText}
                onChange={(e) => setForm({ ...form, highlightsText: e.target.value })}
                rows={4}
              />
            </div>
            <div className="space-y-2">
              <Label>Package Includes (one per line)</Label>
              <Textarea
                value={form.includesText}
                onChange={(e) => setForm({ ...form, includesText: e.target.value })}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label>Day-wise Itinerary</Label>
                <Button type="button" size="sm" variant="outline" onClick={addItineraryDay}>
                  <Plus className="w-4 h-4 mr-1" />
                  Add Day
                </Button>
              </div>
              <div className="space-y-3">
                {form.itinerary.map((day, index) => (
                  <div key={index} className="border rounded-lg p-3 space-y-2 relative bg-gray-50">
                    <button
                      type="button"
                      onClick={() => removeItineraryDay(index)}
                      className="absolute top-2 right-2 text-gray-400 hover:text-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="grid grid-cols-4 gap-2">
                      <Input
                        type="number"
                        placeholder="Day #"
                        value={day.day}
                        onChange={(e) => updateItineraryDay(index, 'day', e.target.value)}
                        className="col-span-1"
                      />
                      <Input
                        placeholder="Day title"
                        value={day.title}
                        onChange={(e) => updateItineraryDay(index, 'title', e.target.value)}
                        className="col-span-3"
                      />
                    </div>
                    <Textarea
                      placeholder="Activities"
                      value={day.activities}
                      onChange={(e) => updateItineraryDay(index, 'activities', e.target.value)}
                      rows={2}
                    />
                  </div>
                ))}
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

AdminDestinations.propTypes = {
  endpoint: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
};

export default AdminDestinations;
