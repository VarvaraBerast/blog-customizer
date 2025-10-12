import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { useState, useRef } from 'react';
import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useOutsideClickClose } from 'src/ui/select/hooks/useOutsideClickClose';
import { Select } from 'src/ui/select';
import {
	defaultArticleState,
	fontColors,
	backgroundColors,
	fontFamilyOptions,
	fontSizeOptions,
	contentWidthArr,
	ArticleStateType,
} from 'src/constants/articleProps';
import { RadioGroup } from 'src/ui/radio-group';
import { Separator } from 'src/ui/separator';

type ArticleParamsFormProps = {
	onApply?: (newStyles: ArticleStateType) => void;
	currentStyle?: ArticleStateType;
};

export const ArticleParamsForm = ({
	onApply,
	currentStyle,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const modalRef = useRef(null);
	const [formState, setFormState] = useState(
		currentStyle || defaultArticleState
	);
	useOutsideClickClose({ isOpen, rootRef: modalRef, onChange: setIsOpen });

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsOpen(false);
		onApply?.(formState);
	};

	const handleReset = (e: React.FormEvent) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setIsOpen(false);
		onApply?.(defaultArticleState);
	};
	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={() => setIsOpen(!isOpen)} />
			<aside
				ref={modalRef}
				className={clsx(styles.container, { [styles.container_open]: isOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						onChange={(newOption) =>
							setFormState({ ...formState, fontFamilyOption: newOption })
						}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						onChange={(newOption) =>
							setFormState({ ...formState, fontSizeOption: newOption })
						}
						name={'font-size'}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						onChange={(newOption) =>
							setFormState({ ...formState, fontColor: newOption })
						}
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						onChange={(newOption) =>
							setFormState({ ...formState, backgroundColor: newOption })
						}
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						onChange={(newOption) =>
							setFormState({ ...formState, contentWidth: newOption })
						}
						selected={formState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
