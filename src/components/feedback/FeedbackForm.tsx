import { ChangeEvent, useState } from 'react';
import { MAX_CHAR_COUNT } from '../../lib/constants';

type FeedbackFormProps = {
  onAddToList: (text: string) => void;
};

export default function FeedbackForm({ onAddToList }: FeedbackFormProps) {
  const [text, setText] = useState('');
  const [showValidIndicator, setShowValidIndicator] = useState(false);
  const [showInvalidIndicator, setShowInvalidIndicator] = useState(false);
  const charCount = MAX_CHAR_COUNT - text.length;

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    if (newText.length > MAX_CHAR_COUNT) return;

    setText(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //basic validation
    if (text.includes('#') && text.length > 5) {
      //green outline
      setShowValidIndicator(true);
      setTimeout(() => setShowValidIndicator(false), 2000);
    } else {
      // red outline
      setShowInvalidIndicator(true);
      setTimeout(() => setShowInvalidIndicator(false), 2000);
      return;
    }

    onAddToList(text);
    setText('');
  };

  return (
    <form
      className={`form ${showValidIndicator ? 'form--valid' : ''} ${
        showInvalidIndicator ? 'form--invalid' : ''
      }`}
      onSubmit={handleSubmit}
    >
      <textarea
        value={text}
        id='feedback-textarea'
        placeholder='blah blah'
        spellCheck={false}
        onChange={handleChange}
      />

      <label htmlFor='feedback-textarea'>
        Enter your feedback here, remember to #hashtag your company
      </label>

      <div>
        <p className='u-italic'>{charCount}</p>
        <button>
          <span>Submit</span>
        </button>
      </div>
    </form>
  );
}
