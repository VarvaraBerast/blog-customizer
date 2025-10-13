import { CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';
export const App = () => {
	const [currentStyles, setStyles] = useState(defaultArticleState);

	const handleApply = (newStyles: ArticleStateType): void => {
		setStyles(newStyles);
	};
	return (
		<main
			className={styles.main}
			style={
				{
					'--font-family': currentStyles.fontFamilyOption.value,
					'--font-size': currentStyles.fontSizeOption.value,
					'--font-color': currentStyles.fontColor.value,
					'--container-width': currentStyles.contentWidth.value,
					'--bg-color': currentStyles.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm onApply={handleApply} currentStyle={currentStyles} />
			<Article />
		</main>
	);
};
