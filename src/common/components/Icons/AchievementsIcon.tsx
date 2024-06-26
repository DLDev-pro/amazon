import Icon from '@ant-design/icons'

const IconSvg = () => (
  <svg
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0"
    viewBox="0 0 24 24"
    className="icon"
    height="1em"
    width="1em"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M20,7h-4V4c0-1.103-0.897-2-2-2h-4C8.897,2,8,2.897,8,4v5H4c-1.103,0-2,0.897-2,2v9c0,0.552,0.447,1,1,1h6h6h6 c0.553,0,1-0.448,1-1V9C22,7.897,21.103,7,20,7z M4,11h4v8H4V11z M10,10V4h4v4v11h-4V10z M20,19h-4V9h4V19z"></path>
  </svg>
)

const AchievementsIcon = (props: any) => <Icon component={IconSvg} {...props} />
export default AchievementsIcon
