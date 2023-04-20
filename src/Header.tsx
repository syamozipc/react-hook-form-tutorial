type proprs = {
  renderCount: number;
  description: string;
};

export default function Header({ renderCount, description }: proprs) {
  return (
    <div className="header">
      <p className="renderCount">Render Count: {renderCount}</p>
      <h1>React Hook Form</h1>
      <p>{description}</p>
    </div>
  );
}
