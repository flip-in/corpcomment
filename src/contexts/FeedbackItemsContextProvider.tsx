import { createContext, useEffect, useMemo, useState } from 'react';
import { TFeedbackItem } from '../lib/types';

type TFeedbackItemsContext = {
  feedbackItems: TFeedbackItem[];
  filteredFeedbackItems: TFeedbackItem[];
  isLoading: boolean;
  errorMessage: string;
  companyList: string[];
  handleAddToList: (text: string) => void;
  handleSelectCompany: (company: string) => void;
};

type FeedbackItemsContextProviderProps = {
  children: React.ReactNode;
};

export const FeedbackItemsContext = createContext<TFeedbackItemsContext | null>(
  null
);

export default function FeedbackItemsContextProvider({
  children,
}: FeedbackItemsContextProviderProps) {
  const [feedbackItems, setFeedbackItems] = useState<TFeedbackItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');

  const companyList = useMemo(() => {
    return feedbackItems
      .map((item) => item.company)
      .filter((company, index, array) => array.indexOf(company) === index);
  }, [feedbackItems]);
  const filteredFeedbackItems = useMemo(() => {
    return selectedCompany
      ? feedbackItems.filter((item) => item.company === selectedCompany)
      : feedbackItems;
  }, [selectedCompany, feedbackItems]);

  const handleSelectCompany = (company: string) => {
    setSelectedCompany(company);
  };
  const handleAddToList = async (text: string) => {
    const companyName = text
      .split(' ')
      .find((word) => word.includes('#'))!
      .substring(1);

    const newItem: TFeedbackItem = {
      id: new Date().getTime(),
      text: text,
      upvoteCount: 0,
      daysAgo: 0,
      company: companyName,
      badgeLetter: companyName.substring(0, 1).toUpperCase(),
    };

    setFeedbackItems([...feedbackItems, newItem]);
    await fetch(
      'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      }
    );
  };

  useEffect(() => {
    const fetchFeedbackItems = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(
          'https://bytegrad.com/course-assets/projects/corpcomment/api/feedbacks'
        );

        if (!response.ok) {
          throw new Error('Something went wrong');
        }
        const data = await response.json();
        setFeedbackItems(data.feedbacks);
      } catch (error) {
        setErrorMessage('something went wrong');
      }

      setIsLoading(false);
    };

    fetchFeedbackItems();
  }, []);

  return (
    <FeedbackItemsContext.Provider
      value={{
        feedbackItems,
        isLoading,
        errorMessage,
        companyList,
        handleAddToList,
        handleSelectCompany,
        filteredFeedbackItems,
      }}
    >
      {children}
    </FeedbackItemsContext.Provider>
  );
}
