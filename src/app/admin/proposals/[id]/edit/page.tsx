import { supabase } from '@/lib/supabase'
import { notFound } from 'next/navigation'
import EditProposalForm from './EditProposalForm'

export const dynamic = 'force-dynamic'

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  
  const { data: proposal, error } = await supabase
    .from('proposals')
    .select('*')
    .eq('id', resolvedParams.id)
    .single()

  if (error || !proposal) {
    notFound()
  }

  return <EditProposalForm initialData={proposal} />
}
