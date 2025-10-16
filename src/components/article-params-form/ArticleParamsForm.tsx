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
	OptionType,
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
	const [isFormOpen, setFormOpen] = useState(false);
	const modalRef = useRef(null);
	const [formState, setFormState] = useState(
		currentStyle || defaultArticleState
	);
	useOutsideClickClose({isOpen: isFormOpen, rootRef: modalRef, onChange: setFormOpen });

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormOpen(false);
		onApply?.(formState);
	};

	const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setFormState(defaultArticleState);
		setFormOpen(false);
		onApply?.(defaultArticleState);
	};
	const handleToggleSidebar = () => {
		setFormOpen(!isFormOpen)
	}
	const updateFormField = (field: keyof typeof formState) => {
		return (value: OptionType) => {
			setFormState({ ...formState, [field]: value });
		};
	};
	return (
		<>
			<ArrowButton isOpen={isFormOpen} onClick={handleToggleSidebar} />
			<aside
				ref={modalRef}
				className={clsx(styles.container, { [styles.container_open]: isFormOpen })}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Select
						onChange={updateFormField('fontFamilyOption')}
						selected={formState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						onChange={updateFormField('fontSizeOption')}
						name={'font-size'}
						selected={formState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						onChange={updateFormField('fontColor')}
						selected={formState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						onChange={updateFormField('backgroundColor')}
						selected={formState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						onChange={updateFormField('contentWidth')}
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
