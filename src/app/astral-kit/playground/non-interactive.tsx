import { Cube } from '@phosphor-icons/react/dist/ssr';

import IconLabelButton from '@/ui/icon-label-button';
import s from './non-interactive.module.scss';

interface Props {
  system?: string;
  user?: string;
  assistant?: string | string[]; // array size relative to input
  labels?: {
    system?: string;
    user?: string;
    assistant?: string;
  };
  input?: Record<string, string> | Record<string, string>[]; // array size relative to assistant
  toggleInteractive: () => void;
}

const NonInteractive = (p: Props) => {
  return (
    <div
      className={[
        s.playground,
        p.system ? s['has-system'] : '',
        p.input ? s['has-input'] : '',
      ].join(' ')}
    >
      <div className={s.header}>
        <IconLabelButton
          className={s.action}
          Icon={Cube}
          onPress={() => p.toggleInteractive()}
        >
          interactive mode
        </IconLabelButton>
      </div>

      {!!p.system && (
        <div className={s.system}>
          <div className={s.label}>{p.labels?.system ?? 'system'}</div>
          <div className={s.content}>{p.system}</div>
        </div>
      )}

      <div className={s.user}>
        <div className={s.label}>{p.labels?.user ?? 'user'}</div>
        <div className={s.content}>{p.user}</div>
      </div>

      <div
        className={s.io}
        style={{ '--size': p.input?.length } as React.CSSProperties}
      >
        {!p.input ? null : Array.isArray(p.input) ? (
          p.input.map((params, i) => (
            <Params key={i} label={`input #${i + 1}`} params={params} />
          ))
        ) : (
          <Params params={p.input as Record<string, string>} />
        )}

        {Array.isArray(p.assistant) ? (
          p.assistant.map((a, i) => (
            <Assistant
              key={i}
              label={`${p.labels?.assistant ?? 'assistant'}: #${i + 1}`}
              assistant={a}
            />
          ))
        ) : (
          <Assistant label={p.labels?.assistant} assistant={p.assistant} />
        )}
      </div>
    </div>
  );
};
export default NonInteractive;

const Params = ({
  label = 'input',
  params,
}: {
  label?: string;
  params: Record<string, string>;
}) => {
  return (
    <div className={s.params}>
      <div className={s.label}>{label}</div>

      <div className={s['params-grid']}>
        {Object.entries(params).map(([k, v]) => (
          <>
            <div className={s['param-key']}>{k}</div>
            <div className={s['param-value']}>{v}</div>
          </>
        ))}
      </div>
    </div>
  );
};

const Assistant = ({
  label = 'assistant',
  assistant,
}: { label?: string } & Pick<Props, 'assistant'>) => {
  return (
    <div className={s.assistant}>
      <div className={s.label}>{label}</div>
      <div className={s.content}>{assistant}</div>
    </div>
  );
};
