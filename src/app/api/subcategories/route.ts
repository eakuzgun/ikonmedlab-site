// Subcategories API

import { NextResponse } from 'next/server'
import { getAllSubcategories } from '@/lib/db/subcategories'

export async function GET() {
  try {
    const subcategories = await getAllSubcategories()
    return NextResponse.json(subcategories)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch subcategories' }, { status: 500 })
  }
}