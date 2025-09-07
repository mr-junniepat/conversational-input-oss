import type { Meta, StoryObj } from '@storybook/react';
import { ConversationalInput } from '../components/ConversationalInput';
import { within, userEvent, expect } from '@storybook/test';

const meta: Meta<typeof ConversationalInput> = {
  title: 'Components/ConversationalInput',
  component: ConversationalInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A conversational input component with AI processing, voice input, and file upload capabilities. Built with security and compliance features for enterprise use.',
      },
    },
  },
  argTypes: {
    onSubmit: { action: 'submitted' },
    onTextChange: { action: 'text changed' },
    onFilesChange: { action: 'files changed' },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the input field',
    },
    enableVoice: {
      control: 'boolean',
      description: 'Enable voice input functionality',
    },
    enableFileUpload: {
      control: 'boolean',
      description: 'Enable file upload functionality',
    },
    showSubmitButton: {
      control: 'boolean',
      description: 'Show the submit button',
    },
    showClearButton: {
      control: 'boolean',
      description: 'Show the clear button when text is present',
    },
    requireFiles: {
      control: 'boolean',
      description: 'Require files to be uploaded before submission',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the entire component',
    },
    isSubmitting: {
      control: 'boolean',
      description: 'Show loading state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic usage story
export const Basic: Story = {
  args: {
    placeholder: 'Start typing or speaking naturally...',
    onSubmit: (text, files) => {
      console.log('Submitted:', { text, files });
    },
  },
};

// With voice input
export const WithVoice: Story = {
  args: {
    placeholder: 'Speak or type your message...',
    enableVoice: true,
    enableFileUpload: false,
    onSubmit: (text, files) => {
      console.log('Voice input submitted:', { text, files });
    },
  },
};

// With file upload
export const WithFileUpload: Story = {
  args: {
    placeholder: 'Describe your experience and upload documents...',
    enableVoice: false,
    enableFileUpload: true,
    acceptedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
    onSubmit: (text, files) => {
      console.log('File upload submitted:', { text, files });
    },
  },
};

// Full featured
export const FullFeatured: Story = {
  args: {
    placeholder: 'Tell us about your experience. You can speak, type, or upload files...',
    enableVoice: true,
    enableFileUpload: true,
    showClearButton: true,
    showSubmitButton: true,
    acceptedFileTypes: ['.pdf', '.doc', '.docx', '.txt', '.jpg', '.jpeg', '.png'],
    onSubmit: (text, files) => {
      console.log('Full featured submitted:', { text, files });
    },
  },
};

// With AI processing
export const WithAIProcessing: Story = {
  args: {
    placeholder: 'Describe your job application...',
    enableVoice: true,
    enableFileUpload: true,
    aiProcessing: {
      provider: 'mistral',
      apiKey: 'demo-key',
      model: 'mistral-small-latest',
      extractStructuredData: true,
      schema: {
        name: 'string',
        email: 'string',
        experience: 'string',
        skills: 'array',
        availability: 'string'
      }
    },
    onSubmit: (text, files) => {
      console.log('AI processing submitted:', { text, files });
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    placeholder: 'This input is disabled...',
    disabled: true,
    enableVoice: true,
    enableFileUpload: true,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    placeholder: 'Processing your input...',
    isSubmitting: true,
    enableVoice: true,
    enableFileUpload: true,
  },
};

// Custom styling
export const CustomStyling: Story = {
  args: {
    placeholder: 'Custom styled input...',
    className: 'max-w-2xl',
    classNames: {
      container: 'border-2 border-purple-300 rounded-3xl',
      textarea: 'bg-purple-50 text-purple-900 placeholder-purple-400',
      submitButton: 'bg-purple-600 hover:bg-purple-700 text-white',
      voiceButton: 'bg-purple-100 text-purple-700 hover:bg-purple-200',
    },
    onSubmit: (text, files) => {
      console.log('Custom styled submitted:', { text, files });
    },
  },
};

// Job application example
export const JobApplication: Story = {
  args: {
    placeholder: 'Hi! I\'m excited to apply for the Software Engineer position. I have 5 years of experience in React and Node.js...',
    enableVoice: true,
    enableFileUpload: true,
    requireFiles: true,
    acceptedFileTypes: ['.pdf', '.doc', '.docx'],
    labels: {
      submit: 'Submit Application',
      addAttachments: 'Upload Resume',
      useVoice: 'Record Introduction',
    },
    onSubmit: (text, files) => {
      console.log('Job application submitted:', { text, files });
    },
  },
};

// Customer support example
export const CustomerSupport: Story = {
  args: {
    placeholder: 'How can we help you today? Please describe your issue...',
    enableVoice: true,
    enableFileUpload: true,
    acceptedFileTypes: ['.png', '.jpg', '.jpeg', '.pdf'],
    labels: {
      submit: 'Send Message',
      addAttachments: 'Add Screenshots',
      useVoice: 'Voice Message',
    },
    onSubmit: (text, files) => {
      console.log('Support ticket submitted:', { text, files });
    },
  },
};

// Interactive test
export const InteractiveTest: Story = {
  args: {
    placeholder: 'Try typing, using voice, or uploading files...',
    enableVoice: true,
    enableFileUpload: true,
    onSubmit: (text, files) => {
      console.log('Interactive test submitted:', { text, files });
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    
    // Test typing
    const textarea = canvas.getByRole('textbox');
    await userEvent.type(textarea, 'This is a test message');
    
    // Test clear button
    const clearButton = canvas.getByRole('button', { name: /clear/i });
    await userEvent.click(clearButton);
    
    // Verify text is cleared
    await expect(textarea).toHaveValue('');
  },
};
