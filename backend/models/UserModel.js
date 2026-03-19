const supabase = require('../config/db');
const bcrypt = require('bcryptjs');

class UserModel {
  static async create(userData) {
    const { email, password, name, role = 'user' } = userData;

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const { data, error } = await supabase
      .from('users')
      .insert([
        {
          email,
          password_hash: passwordHash,
          name,
          role,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async findByEmail(email) {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async findById(id) {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, role, avatar_url, created_at')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data;
  }

  static async updateById(id, updateData) {
    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async getAll() {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, name, role, avatar_url, created_at')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
}

module.exports = UserModel;
