import { useOpenAccount } from "@/features/accounts/hooks/use-open-accounts";

type AccountColumnProps = {
  account: string;
  accountId: string;
};

export function AccountColumn({ account, accountId }: AccountColumnProps) {
  const onOpenAccount = useOpenAccount((state) => state.onOpen);

  const handleClickAccount = () => {
    onOpenAccount(accountId);
  };

  return (
    <div
      className="flex items-center cursor-pointer hover:underline"
      onClick={handleClickAccount}
    >
      {account}
    </div>
  );
}
