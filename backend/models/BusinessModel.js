const supabase = require('../config/db');

class BusinessModel {
  static async create(businessData) {
    const { data, error } = await supabase
      .from('businesses')
      .insert([businessData])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('businesses')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async findAll(filters = {}) {
    let query = supabase.from('businesses').select('*');

    if (filters.category) {
      query = query.eq('category', filters.category);
    }

    if (filters.city) {
      query = query.ilike('city', `%${filters.city}%`);
    }

    if (filters.state) {
      query = query.ilike('state', `%${filters.state}%`);
    }

    if (filters.search) {
      query = query.or(`name.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  static async updateById(id, updateData) {
    const { data, error } = await supabase
      .from('businesses')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteById(id) {
    const { error } = await supabase
      .from('businesses')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  static async getCategories() {
    const { data, error } = await supabase
      .from('businesses')
      .select('category')
      .order('category');

    if (error) throw error;

    const uniqueCategories = [...new Set(data.map(item => item.category))];
    return uniqueCategories;
  }
}

module.exports = BusinessModel;
