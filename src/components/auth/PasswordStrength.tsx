interface PasswordStrengthProps {
  password: string;
}

export default function PasswordStrength({ password }: PasswordStrengthProps) {
  const getStrength = (): { score: number; message: string } => {
    let score = 0;
    
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    const messages = [
      'Very weak',
      'Weak',
      'Fair',
      'Good',
      'Strong'
    ];

    return {
      score,
      message: messages[score - 1] || 'Very weak'
    };
  };

  const strength = getStrength();
  const width = `${(strength.score / 5) * 100}%`;

  return (
    <div className="mt-1">
      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full transition-all duration-300 ${
            strength.score <= 2 ? 'bg-red-500' :
            strength.score === 3 ? 'bg-yellow-500' :
            'bg-green-500'
          }`}
          style={{ width }}
        />
      </div>
      <p className="mt-1 text-sm text-gray-600">
        Password strength: {strength.message}
      </p>
    </div>
  );
}