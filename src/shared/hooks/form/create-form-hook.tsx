// https://github.com/TanStack/form/blob/main/packages/react-form/src/createFormHook.tsx
import type { ComponentType, Context, JSX, PropsWithChildren } from 'react'
import type { AnyFieldApi, AnyFormApi, DeepKeysOfType, FieldsMap, FormApi, FormAsyncValidateOrFn, FormValidateOrFn } from '@tanstack/form-core'
import type { AppFieldExtendedReactFieldGroupApi, AppFieldExtendedReactFormApi, FieldComponent, ReactFormExtendedApi, WithFieldGroupProps, WithFormProps } from '@tanstack/react-form'

import { useMemo } from 'react'
import { Field, useFieldGroup } from '@tanstack/react-form'

import { useIsomorphicLayoutEffect } from '@/shared'

type UnwrapOrAny<T> = [unknown] extends [T] ? any : T
type UnwrapDefaultOrAny<DefaultT, T> = [DefaultT] extends [T]
  ? [T] extends [DefaultT] ? any : T : T

type CreateFormHookProps<
  TFieldComponents extends Record<string, ComponentType<any>>,
  TFormComponents extends Record<string, ComponentType<any>>,
> = {
  fieldComponents: TFieldComponents
  fieldContext: Context<AnyFieldApi>
  formComponents: TFormComponents
  formContext: Context<AnyFormApi>
}

export function createFormHook<
  const TComponents extends Record<string, ComponentType<any>>,
  const TFormComponents extends Record<string, ComponentType<any>>,
>({
  fieldComponents,
  fieldContext,
  formContext,
  formComponents,
}: CreateFormHookProps<TComponents, TFormComponents>) {
  function useAppForm<
    TFormData,
    TOnMount extends undefined | FormValidateOrFn<TFormData>,
    TOnChange extends undefined | FormValidateOrFn<TFormData>,
    TOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnBlur extends undefined | FormValidateOrFn<TFormData>,
    TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnSubmit extends undefined | FormValidateOrFn<TFormData>,
    TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnDynamic extends undefined | FormValidateOrFn<TFormData>,
    TOnDynamicAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnServer extends undefined | FormAsyncValidateOrFn<TFormData>,
    TSubmitMeta,
  >(
    // FormApi instnace instead of options, since we already create instance inside Mobx store
    formApi: FormApi<
      TFormData,
      TOnMount,
      TOnChange,
      TOnChangeAsync,
      TOnBlur,
      TOnBlurAsync,
      TOnSubmit,
      TOnSubmitAsync,
      TOnDynamic,
      TOnDynamicAsync,
      TOnServer,
      TSubmitMeta
    >,
  ): AppFieldExtendedReactFormApi<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta,
    TComponents,
    TFormComponents
  > {
    // Do what useForm hook does
    const form = useMemo(() => {
      const extendedApi: ReactFormExtendedApi<
        TFormData,
        TOnMount,
        TOnChange,
        TOnChangeAsync,
        TOnBlur,
        TOnBlurAsync,
        TOnSubmit,
        TOnSubmitAsync,
        TOnDynamic,
        TOnDynamicAsync,
        TOnServer,
        TSubmitMeta
      > = formApi as never

      extendedApi.Field = function APIField(props) {
        return <Field {...props} form={formApi} />
      }

      return extendedApi
    }, [formApi])

    // Mounting, probably could be done right in mobx store if use useState or useLocalObservable for creating stores
    useIsomorphicLayoutEffect(formApi.mount, [])

    const AppForm = useMemo(() => {
      const AppForm = (({ children }) => {
        return (
          <formContext.Provider value={form}>
            {children}
          </formContext.Provider>
        )
      }) as ComponentType<PropsWithChildren>
      return AppForm
    }, [form])

    const AppField = useMemo(() => {
      const AppField = (({ children, ...props }) => {
        return (
          <form.Field {...props}>
            {field => (
              <fieldContext.Provider value={field}>
                {children(Object.assign(field, fieldComponents))}
              </fieldContext.Provider>
            )}
          </form.Field>
        )
      }) as FieldComponent<
        TFormData,
        TOnMount,
        TOnChange,
        TOnChangeAsync,
        TOnBlur,
        TOnBlurAsync,
        TOnSubmit,
        TOnSubmitAsync,
        TOnDynamic,
        TOnDynamicAsync,
        TOnServer,
        TSubmitMeta,
        TComponents
      >
      return AppField
    }, [form])

    const extendedForm = useMemo(() => {
      return Object.assign(form, {
        AppField,
        AppForm,
        ...formComponents,
      })
    }, [form, AppField, AppForm])

    return extendedForm
  }
  function withForm<
    TFormData,
    TOnMount extends undefined | FormValidateOrFn<TFormData>,
    TOnChange extends undefined | FormValidateOrFn<TFormData>,
    TOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnBlur extends undefined | FormValidateOrFn<TFormData>,
    TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnSubmit extends undefined | FormValidateOrFn<TFormData>,
    TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnDynamic extends undefined | FormValidateOrFn<TFormData>,
    TOnDynamicAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnServer extends undefined | FormAsyncValidateOrFn<TFormData>,
    TSubmitMeta,
    TRenderProps extends object = object,
  >({
    render,
    props,
  }: WithFormProps<
    TFormData,
    TOnMount,
    TOnChange,
    TOnChangeAsync,
    TOnBlur,
    TOnBlurAsync,
    TOnSubmit,
    TOnSubmitAsync,
    TOnDynamic,
    TOnDynamicAsync,
    TOnServer,
    TSubmitMeta,
    TComponents,
    TFormComponents,
    TRenderProps
  >): WithFormProps<
    UnwrapOrAny<TFormData>,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnMount>,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnChange>,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnChangeAsync>,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnBlur>,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnBlurAsync>,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnSubmit>,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnSubmitAsync>,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnDynamic>,
    UnwrapDefaultOrAny<
      undefined | FormValidateOrFn<TFormData>,
      TOnDynamicAsync
    >,
    UnwrapDefaultOrAny<undefined | FormValidateOrFn<TFormData>, TOnServer>,
    UnwrapOrAny<TSubmitMeta>,
    UnwrapOrAny<TComponents>,
    UnwrapOrAny<TFormComponents>,
    UnwrapOrAny<TRenderProps>
  >['render'] {
    return innerProps => render({ ...props, ...innerProps })
  }

  function withFieldGroup<
    TFieldGroupData,
    TSubmitMeta,
    TRenderProps extends Record<string, unknown>,
  >({
    render,
    props,
    defaultValues,
  }: WithFieldGroupProps<
    TFieldGroupData,
    TComponents,
    TFormComponents,
    TSubmitMeta,
    TRenderProps
  >): <
    TFormData,
    TFields extends
    | DeepKeysOfType<TFormData, TFieldGroupData | null | undefined>
    | FieldsMap<TFormData, TFieldGroupData>,
    TOnMount extends undefined | FormValidateOrFn<TFormData>,
    TOnChange extends undefined | FormValidateOrFn<TFormData>,
    TOnChangeAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnBlur extends undefined | FormValidateOrFn<TFormData>,
    TOnBlurAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnSubmit extends undefined | FormValidateOrFn<TFormData>,
    TOnSubmitAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnDynamic extends undefined | FormValidateOrFn<TFormData>,
    TOnDynamicAsync extends undefined | FormAsyncValidateOrFn<TFormData>,
    TOnServer extends undefined | FormAsyncValidateOrFn<TFormData>,
    TFormSubmitMeta,
  >(
    params: PropsWithChildren<
      NoInfer<TRenderProps> & {
        form: | AppFieldExtendedReactFormApi<
          TFormData,
          TOnMount,
          TOnChange,
          TOnChangeAsync,
          TOnBlur,
          TOnBlurAsync,
          TOnSubmit,
          TOnSubmitAsync,
          TOnDynamic,
          TOnDynamicAsync,
          TOnServer,
          unknown extends TSubmitMeta ? TFormSubmitMeta : TSubmitMeta,
          TComponents,
          TFormComponents
        >
        | AppFieldExtendedReactFieldGroupApi<
          // Since this only occurs if you nest it within other field groups, it can be more
          // lenient with the types.
          unknown,
          TFormData,
          string | FieldsMap<unknown, TFormData>,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          any,
          unknown extends TSubmitMeta ? TFormSubmitMeta : TSubmitMeta,
          TComponents,
          TFormComponents
        >
        fields: TFields
      }
    >,
  ) => JSX.Element {
    return function Render(innerProps) {
      const fieldGroupProps = useMemo(() => {
        return {
          form: innerProps.form,
          fields: innerProps.fields,
          defaultValues,
          formComponents,
        }
      }, [innerProps.form, innerProps.fields])
      const fieldGroupApi = useFieldGroup(fieldGroupProps as any)

      return render({ ...props, ...innerProps, group: fieldGroupApi as any })
    }
  }
  return { useAppForm, withForm, withFieldGroup }
}
