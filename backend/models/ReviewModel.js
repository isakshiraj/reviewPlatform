const supabase = require('../config/db');

class ReviewModel {
  static async create(reviewData) {
    const { quality_rating, service_rating, value_rating } = reviewData;
    const overall_rating = (quality_rating + service_rating + value_rating) / 3;

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          ...reviewData,
          overall_rating: parseFloat(overall_rating.toFixed(2)),
          status: 'pending',
        },
      ])
      .select('*, users(name, email, avatar_url), businesses(name)')
      .single();

    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, users(name, email, avatar_url), businesses(name)')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async findByBusinessId(businessId, status = 'approved') {
    let query = supabase
      .from('reviews')
      .select('*, users(name, avatar_url)')
      .eq('business_id', businessId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  static async findByUserId(userId) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*, businesses(name, category)')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }

  static async findAll(filters = {}) {
    let query = supabase
      .from('reviews')
      .select('*, users(name, email, avatar_url), businesses(name, category)');

    if (filters.status) {
      query = query.eq('status', filters.status);
    }

    if (filters.business_id) {
      query = query.eq('business_id', filters.business_id);
    }

    if (filters.user_id) {
      query = query.eq('user_id', filters.user_id);
    }

    query = query.order('created_at', { ascending: false });

    const { data, error } = await query;

    if (error) throw error;
    return data;
  }

  static async updateById(id, updateData) {
    if (updateData.quality_rating || updateData.service_rating || updateData.value_rating) {
      const { data: existingReview } = await supabase
        .from('reviews')
        .select('quality_rating, service_rating, value_rating')
        .eq('id', id)
        .maybeSingle();

      const quality = updateData.quality_rating || existingReview.quality_rating;
      const service = updateData.service_rating || existingReview.service_rating;
      const value = updateData.value_rating || existingReview.value_rating;

      updateData.overall_rating = parseFloat(((quality + service + value) / 3).toFixed(2));
    }

    const { data, error } = await supabase
      .from('reviews')
      .update(updateData)
      .eq('id', id)
      .select('*, users(name, email, avatar_url), businesses(name)')
      .single();

    if (error) throw error;
    return data;
  }

  static async approveReview(id, adminId) {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        status: 'approved',
        reviewed_by: adminId,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*, users(name, email, avatar_url), businesses(name)')
      .single();

    if (error) throw error;
    return data;
  }

  static async rejectReview(id, adminId) {
    const { data, error } = await supabase
      .from('reviews')
      .update({
        status: 'rejected',
        reviewed_by: adminId,
        reviewed_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select('*, users(name, email, avatar_url), businesses(name)')
      .single();

    if (error) throw error;
    return data;
  }

  static async deleteById(id) {
    const { error } = await supabase
      .from('reviews')
      .delete()
      .eq('id', id);

    if (error) throw error;
    return true;
  }

  static async getPendingCount() {
    const { count, error } = await supabase
      .from('reviews')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'pending');

    if (error) throw error;
    return count;
  }
}

module.exports = ReviewModel;
