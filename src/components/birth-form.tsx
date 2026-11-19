'use client';
import { useId, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { parseBirthDateEntry } from '@/lib/birth-date-entry';
import { ArrowIcon } from './arrow-icon';
export function BirthForm({submitLabel='Generate My Full Reading'}:{submitLabel?:string}={}) {
  const fieldId = useId();
  const noteId = `${fieldId}-note`;
  const errorId = `${fieldId}-error`;
  const [date,setDate]=useState('');
  const [error,setError]=useState('');
  const [pending,startTransition]=useTransition();
  const router=useRouter();
  return <form className="birth-form" action="/result" onSubmit={event=>{
    event.preventDefault();
    const result=parseBirthDateEntry(date);
    if (!result.success) {
      const issue = result.error.issues[0];
      setError(issue.code === 'custom' ? issue.message : 'Enter your birth date as DD.MM.YYYY.');
      return;
    }
    setError('');startTransition(()=>router.push(`/report/${result.data}`));
  }} noValidate aria-busy={pending}>
    <label htmlFor={fieldId}>Your date of birth</label>
    <p id={noteId} className="birth-date-note">Enter your birth date to generate your full reading.</p>
    <div className="form-row"><input id={fieldId} name="date" type="text" placeholder="DD.MM.YYYY" spellCheck={false} required autoComplete="bday" value={date} onChange={event=>{setDate(event.target.value);setError('');}} aria-invalid={!!error} aria-describedby={error ? `${noteId} ${errorId}` : noteId}/>
      <button className="button" disabled={pending} type="submit">{pending?'Opening your reading…':submitLabel}<ArrowIcon /></button></div>
    {error && <p id={errorId} role="alert" className="error">{error}</p>}
  </form>;
}
