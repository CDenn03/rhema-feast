interface Props {
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export function FormSection({ title, description, children }: Props) {
  return (
    <div className="space-y-4 rounded-lg border p-6">
      {(title || description) && (
        <div className="space-y-1 border-b pb-4">
          {title && <h3 className="font-medium">{title}</h3>}
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      {children}
    </div>
  );
}
